import React, { useState } from 'react';
import { 
  Package, 
  TrendingDown, 
  AlertCircle, 
  Truck, 
  QrCode,
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  MapPin,
  Scan,
  Shield,
  Timer,
  Bell
} from 'lucide-react';

interface AssociationProfileProps {
  onBack: () => void;
}

const AssociationProfile: React.FC<AssociationProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [scanningMode, setScanningMode] = useState(false);
  
  const tabs = [
    { id: 'inventory', label: 'Stocks Intelligents', icon: Package },
    { id: 'reception', label: 'Réception Scanner', icon: Truck },
    { id: 'distribution', label: 'QR Géolocalisé', icon: QrCode },
    { id: 'alerts', label: 'Alertes Auto', icon: AlertCircle }
  ];

  const stockItems = [
    { 
      id: '1', 
      name: 'Riz blanc', 
      quantity: 45, 
      criticalLevel: 20, 
      category: 'Féculents',
      location: 'Étagère A1',
      expiration: '2024-12-15',
      status: 'ok',
      lastScanned: '2024-01-15 14:30',
      autoAlert: true
    },
    { 
      id: '2', 
      name: 'Lait UHT', 
      quantity: 8, 
      criticalLevel: 15, 
      category: 'Produits laitiers',
      location: 'Réfrigérateur B',
      expiration: '2024-02-10',
      status: 'critical',
      lastScanned: '2024-01-15 09:15',
      autoAlert: true
    },
    { 
      id: '3', 
      name: 'Pâtes', 
      quantity: 67, 
      criticalLevel: 25, 
      category: 'Féculents',
      location: 'Étagère A2',
      expiration: '2025-06-20',
      status: 'ok',
      lastScanned: '2024-01-14 16:45',
      autoAlert: false
    }
  ];

  const pendingDistributions = [
    { 
      id: 'QR001', 
      beneficiary: 'Marie D.', 
      time: '14:30', 
      status: 'pending',
      items: ['Riz 2kg', 'Lait 4L', 'Pain'],
      geoRequired: true,
      validHours: 48,
      distance: 0.2
    },
    { 
      id: 'QR002', 
      beneficiary: 'Ahmed H.', 
      time: '15:00', 
      status: 'geo_verified',
      items: ['Pâtes 1kg', 'Conserves', 'Fruits'],
      geoRequired: true,
      validHours: 24,
      distance: 0.0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-600 border-red-200';
      case 'low': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-green-100 text-green-600 border-green-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Critique';
      case 'low': return 'Faible';
      default: return 'OK';
    }
  };

  const simulateQRScan = () => {
    setScanningMode(true);
    setTimeout(() => {
      setScanningMode(false);
      // Simulation de validation QR + géolocalisation
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux profils
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Package className="mr-4" size={32} />
              <div>
                <h1 className="text-3xl font-bold">Association</h1>
                <p className="text-purple-100">Scanner automatique • Alertes IA • QR géolocalisé</p>
              </div>
            </div>
            <div className="flex space-x-6 text-right">
              <div>
                <div className="flex items-center mb-1">
                  <Scan className="mr-2" size={16} />
                  <span className="text-sm">Scans/jour</span>
                </div>
                <div className="text-2xl font-bold">127</div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <Bell className="mr-2" size={16} />
                  <span className="text-sm">Alertes auto</span>
                </div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-purple-700/50 backdrop-blur-sm rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-purple-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Total articles</h3>
                <p className="text-3xl font-bold text-purple-600">132</p>
                <p className="text-sm text-purple-600">+8 cette semaine</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-red-800 mb-2">Stocks critiques</h3>
                  <Bell className="text-red-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-red-600">3</p>
                <p className="text-sm text-red-600">Alertes auto envoyées</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Stocks faibles</h3>
                <p className="text-3xl font-bold text-yellow-600">7</p>
                <p className="text-sm text-yellow-600">Surveillance IA</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">QR validés</h3>
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-blue-600">Cette semaine</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Inventaire Intelligent</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-purple-600">
                    <Scan className="mr-2" size={20} />
                    <span className="font-medium">Scanner actif</span>
                  </div>
                  <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="mr-2" size={20} />
                    Scanner entrée/sortie
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2">Article</th>
                      <th className="text-left py-3 px-2">Quantité</th>
                      <th className="text-left py-3 px-2">Localisation</th>
                      <th className="text-left py-3 px-2">Expiration</th>
                      <th className="text-left py-3 px-2">Statut</th>
                      <th className="text-left py-3 px-2">Dernière mise à jour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium">{item.quantity}</p>
                            <p className="text-sm text-gray-600">Seuil: {item.criticalLevel}</p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <MapPin className="text-gray-400 mr-1" size={14} />
                            <span className="text-gray-600">{item.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-gray-600">{item.expiration}</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(item.status)}`}>
                              {getStatusText(item.status)}
                            </span>
                            {item.autoAlert && (
                              <Bell className="text-blue-500" size={14} />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <p className="text-sm text-gray-600">{item.lastScanned}</p>
                          <div className="flex items-center mt-1">
                            <Scan className="text-green-500 mr-1" size={12} />
                            <span className="text-xs text-green-600">Auto-scanné</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reception' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Réception Automatisée</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                  <Scan className="mr-2" size={24} />
                  Scanner automatique d'entrée
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center bg-white">
                    {scanningMode ? (
                      <div className="space-y-4">
                        <div className="animate-spin mx-auto">
                          <Scan className="text-purple-600" size={48} />
                        </div>
                        <p className="text-purple-700 font-medium">Scan en cours...</p>
                        <div className="w-full bg-purple-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Package className="mx-auto text-purple-600" size={48} />
                        <h4 className="text-lg font-semibold text-purple-800">Scanner colis entrant</h4>
                        <p className="text-purple-600">Détection automatique des produits</p>
                        <button 
                          onClick={() => setScanningMode(true)}
                          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Activer scanner
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Derniers scans automatiques</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {[
                        { product: 'Riz Uncle Ben\'s 1kg x5', time: '14:32', confidence: 98 },
                        { product: 'Lait Lactel 1L x12', time: '14:28', confidence: 96 },
                        { product: 'Pain de mie Harry\'s x3', time: '14:25', confidence: 94 }
                      ].map((scan, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div>
                            <p className="font-medium">{scan.product}</p>
                            <p className="text-sm text-gray-600">{scan.time}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-600 font-medium">
                              Confiance: {scan.confidence}%
                            </div>
                            <div className="text-xs text-gray-500">Auto-ajouté</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Nouveau don reçu</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donateur
                      </label>
                      <input 
                        type="text" 
                        placeholder="Nom du donateur"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de don
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <option>Alimentaire</option>
                        <option>Hygiène</option>
                        <option>Maison</option>
                        <option>Mixte</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                        Auto-inventorier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Réceptions récentes</h3>
              <div className="space-y-3">
                {[
                  { 
                    id: '1', 
                    donor: 'Famille Martin', 
                    date: '2024-01-15', 
                    items: 'Riz, Pâtes, Conserves',
                    quantity: '15 kg',
                    scanned: true
                  },
                  { 
                    id: '2', 
                    donor: 'Supermarché Casino', 
                    date: '2024-01-14', 
                    items: 'Fruits, Légumes, Pain',
                    quantity: '25 kg',
                    scanned: true
                  }
                ].map((reception) => (
                  <div key={reception.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center">
                      <Truck className="text-purple-600 mr-3" size={24} />
                      <div>
                        <p className="font-medium">{reception.donor}</p>
                        <p className="text-sm text-gray-600">{reception.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{reception.quantity}</p>
                      <div className="flex items-center text-sm">
                        <p className="text-gray-600 mr-2">{reception.date}</p>
                        {reception.scanned && (
                          <span className="flex items-center text-green-600">
                            <Scan className="mr-1" size={12} />
                            Auto-scanné
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'distribution' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Distribution QR Géolocalisée</h2>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <QrCode className="mr-2" size={24} />
                  Scanner QR avec vérification géolocalisée
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center bg-white">
                    {scanningMode ? (
                      <div className="space-y-4">
                        <div className="animate-pulse">
                          <QrCode className="text-green-600 mx-auto" size={48} />
                        </div>
                        <p className="text-green-700 font-medium">Vérification QR + GPS...</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-sm text-green-600">
                            <Shield className="mr-1" size={14} />
                            QR Code validé ✓
                          </div>
                          <div className="flex items-center justify-center text-sm text-green-600">
                            <MapPin className="mr-1" size={14} />
                            Géolocalisation OK ✓
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <QrCode className="mx-auto text-green-600" size={48} />
                        <h4 className="text-lg font-semibold text-green-800">Scanner QR Code</h4>
                        <p className="text-green-600">Vérification automatique position + validité</p>
                        <button 
                          onClick={simulateQRScan}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Scanner QR Code
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">QR Codes en attente</h4>
                    <div className="space-y-3">
                      {pendingDistributions.map((distribution) => (
                        <div key={distribution.id} className="p-4 bg-white border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{distribution.beneficiary}</p>
                            <div className="flex items-center space-x-2">
                              {distribution.geoRequired && (
                                <MapPin className="text-blue-500" size={14} />
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                distribution.status === 'geo_verified' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-yellow-100 text-yellow-600'
                              }`}>
                                {distribution.status === 'geo_verified' ? 'Géo OK' : 'En attente'}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Heure prévue: {distribution.time}</p>
                            <p>Distance: {distribution.distance}km</p>
                            <div className="flex items-center">
                              <Timer className="mr-1" size={12} />
                              <span>Validité: {distribution.validHours}h restantes</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {distribution.items.map((item, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Statistiques Temps Réel</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600">Aujourd'hui</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-blue-600">QR validés avec géo</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600">Cette semaine</p>
                    <p className="text-2xl font-bold text-green-600">78</p>
                    <p className="text-sm text-green-600">Colis distribués</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600">Précision GPS</p>
                    <p className="text-2xl font-bold text-purple-600">98%</p>
                    <p className="text-sm text-purple-600">Taux de validation</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Sécurité & Contrôles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Shield className="text-green-600 mr-2" size={18} />
                      <span className="font-medium">Chiffrement AES-256</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Actif</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <MapPin className="text-blue-600 mr-2" size={18} />
                      <span className="font-medium">Géolocalisation requise</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">100%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center">
                      <Timer className="text-orange-600 mr-2" size={18} />
                      <span className="font-medium">Validité 72h max</span>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">Contrôlé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Système d'Alertes Automatiques</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingDown className="text-red-500 mr-3" size={24} />
                      <div>
                        <h3 className="font-semibold text-red-800">Stock critique automatique - Lait UHT</h3>
                        <p className="text-red-600">Seulement 8 unités restantes (seuil: 15)</p>
                        <div className="flex items-center mt-1 text-sm text-red-500">
                          <Bell className="mr-1" size={14} />
                          <span>Alerte auto-déclenchée il y a 2 heures</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Demander réapprovisionnement
                    </button>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="text-yellow-500 mr-3" size={24} />
                      <div>
                        <h3 className="font-semibold text-yellow-800">Expiration détectée automatiquement</h3>
                        <p className="text-yellow-600">6 articles expirent dans les 7 prochains jours</p>
                        <div className="flex items-center mt-1 text-sm text-yellow-500">
                          <Scan className="mr-1" size={14} />
                          <span>Détection IA - Scanner automatique</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                      Prioriser distribution
                    </button>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="text-blue-500 mr-3" size={24} />
                      <div>
                        <h3 className="font-semibold text-blue-800">Pic de demande prévu</h3>
                        <p className="text-blue-600">15 QR codes actifs pour aujourd'hui 14h-17h</p>
                        <div className="flex items-center mt-1 text-sm text-blue-500">
                          <MapPin className="mr-1" size={14} />
                          <span>Géolocalisation activée pour tous</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      Préparé
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="text-green-500 mr-3" size={24} />
                      <div>
                        <h3 className="font-semibold text-green-800">Sécurité QR renforcée</h3>
                        <p className="text-green-600">Tous les QR codes validés avec géolocalisation</p>
                        <div className="flex items-center mt-1 text-sm text-green-500">
                          <Timer className="mr-1" size={14} />
                          <span>Aucun dépassement de 72h détecté</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      ✓ Sécurisé
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Configuration Alertes IA</h3>
                <div className="space-y-4">
                  {stockItems.filter(item => item.status !== 'ok').map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} unités (seuil: {item.criticalLevel})
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                        {item.autoAlert && (
                          <Bell className="text-blue-500" size={14} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions Automatisées</h3>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Bell className="mr-2" size={18} />
                    Configurer nouvelles alertes
                  </button>
                  <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center">
                    <Scan className="mr-2" size={18} />
                    Programmer scan automatique
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <AlertCircle className="mr-2" size={18} />
                    Rapport d'alertes mensuel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationProfile;